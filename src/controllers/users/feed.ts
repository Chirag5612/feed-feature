import { Response } from "express";
import mongoose from "mongoose";
import log4js from "log4js";
import response from "../../helper/responseMiddleware";
import UserFeedModel from "../../models/feed-model";
import commentModel from "../../models/comment-model";
const logger = log4js.getLogger();
// store feed 
const storeFeed = async (req: any, res: Response) => {
  const session: any = await mongoose.startSession();
  session.startTransaction();
  try {

    let { venueId, title, description,venueName,venueDate,venueLocation } = req.body;
    const userId = req.user.id;
    const feedData = new UserFeedModel({
      venueId,
      title,
      description,
      userId,
      venueName,venueDate,venueLocation
    });

    // Save the venue to the database
    const data = await feedData.save();

    if (data) {
      await session.commitTransaction();
      await session.endSession();
      const responseData: any = {
        message: "Feed Added successfully",
        data:data
      }
      return await response.sendSuccess(req, res, responseData);
    } else {
      const sendResponse: any = {
        message: "There is issue with add feed "
      }
      await session.abortTransaction();
      session.endSession();
      return response.sendError(res, sendResponse);
    }
  } catch (err: any) {
    const sendResponse: any = {
      message: err.message,
    };
    logger.info("Feed data Add");
    logger.info(err);
    await session.abortTransaction();
    session.endSession();
    return response.sendError(res, sendResponse);
  }
};
// get feed list 
const getFeed = async (req: any, res: Response) => {
  const session: any = await mongoose.startSession();
  session.startTransaction();
  try {


    let id = req.body.feedId;
    let limit = req.body.limit ? parseInt(req.body.limit) : 5;
    let page = req.body.page ? parseInt(req.body.page) : 1;
    let userId = req.user._id;
    const matchStage = id
      ? [{ $match: { _id: new mongoose.Types.ObjectId(id) } }]
      : [];


    const pipeline: any = [
      ...matchStage,
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $lookup: {
          from: 'venues',
          localField: 'venueId',
          foreignField: '_id',
          as: 'venuesDetail',
        },
      },
      {
        $unwind: '$venuesDetail',
      },
      {
        $lookup: {
          from: 'sports',
          let: { venueType: "$venuesDetail.venueType" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$_id", "$$venueType"] },
              },
            },
          ],
          as: 'sportsDetail',
        },
      },
      {
        $unwind: '$sportsDetail',
      },

      {
        $lookup: {
          from: 'comments',
          let: { feedId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$feedId', '$$feedId'] },
              },
            },
          ],
          as: 'commentDetail',
        },
      },
      {
        $addFields: {
          totalCommentCount: { $size: '$commentDetail' },
        },
      },

      {
        $addFields: {
          totalLikeCount: {
            $cond: {
              if: { $isArray: '$likes' },
              then: { $size: '$likes' },
              else: 0,
            },
          },
        },
      },

      {
        $addFields: {
          userLiked: {
            $in: [new mongoose.Types.ObjectId(req.user._id), '$likes'],
          },
        },
      },
    
      {
        $project: {
          _id: 1,
          createdAt: 1,
          userId: '$user._id',
          userImage: '$user.profile_photo',
          userName: '$user.full_name',
          commentText: '$text',
          venueDate: 1,
          venueId: "$venuesDetail._id",
          venueName: 1,
          venueImage: { $arrayElemAt: ['$venuesDetail.imageList', 0] },
          venueLocation: 1,
          venueType: "$sportsDetail.title",
          latitude: "$venuesDetail.latitude",
          longitude: "$venuesDetail.longitude",
          userLiked: 1,
          totalLikeCount: 1,
          totalCommentCount: 1,
        },
      },
      { $sort: { createdAt: -1 } },
      {
        $facet: {
          paginatedResults: [
            {
              $skip: (page - 1) * limit,
            },
            {
              $limit: limit,
            },
          ],
          totalCount: [
            {
              $count: 'count',
            },
          ],
        },
      },
    ];
    const result = await UserFeedModel.aggregate(pipeline).exec();
    const userFeedDetail: any = JSON.parse(JSON.stringify(result[0].paginatedResults));
    const totalCount = result[0].totalCount[0] ? result[0].totalCount[0].count : 0;
    const totalPages = Math.ceil(totalCount / limit);
    let sendResponse: any;
    if (userFeedDetail.length > 0) {
      sendResponse = {
        code: 200,
        status: "success",
        message: process.env.APP_GET_MESSAGE,
        data: userFeedDetail,
        total_items: totalCount,
        total_pages: totalPages,
      };
    } else {
      sendResponse = {
        code: 200,
        status: "success",
        message: "No data found1",
        total_items: totalCount,
        total_pages: totalPages,
        data: [],
      };
    }
    if (userFeedDetail) {
      await session.commitTransaction();
      await session.endSession();
      return res.status(200).send(sendResponse);
    } else {
      const sendResponse: any = {
        message: "There is issue with get feed "
      }
      await session.abortTransaction();
      session.endSession();
      return response.sendError(res, sendResponse);
    }
  } catch (err: any) {
    const sendResponse: any = {
      message: err.message,
    };
    logger.info("Feed data Add");
    logger.info(err);
    await session.abortTransaction();
    session.endSession();
    return response.sendError(res, sendResponse);
  }
};
// store comment 
const storeComment = async (req: any, res: Response) => {
  const session: any = await mongoose.startSession();
  session.startTransaction();
  try {

    let { text, feedId, venueId } = req.body;
    let userId = req.user.id;
    const newComment = new commentModel({
      text,
      userId,
      feedId,
      venueId,
    });

    // Save the comment to the database
    const data = await newComment.save();
    const commenteIdSend = data._id.toString();
    if (data) {
      const getData:any = await getCommentData({commenteIdSend:commenteIdSend});
      await session.commitTransaction();
      await session.endSession();
      const responseData: any = {
        message: "Feed Comment Added",
        data :getData
      }
      return await response.sendSuccess(req, res, responseData);
    } else {
      const sendResponse: any = {
        message: "There is issue with add feed comment"
      }
      await session.abortTransaction();
      session.endSession();
      return response.sendError(res, sendResponse);
    }
  } catch (err: any) {
    const sendResponse: any = {
      message: err.message,
    };
    logger.info("Feed comment Add");
    logger.info(err);
    await session.abortTransaction();
    session.endSession();
    return response.sendError(res, sendResponse);
  }
};
//get comment data with user data 
const getCommentData = async (props: any) => {
  const { commenteIdSend } = props;

  const postCommentData: any = await commentModel.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(commenteIdSend)
      }
    },
    {
      $lookup: {
        from: 'users', // Collection name for users
        localField: 'userId',
        foreignField: '_id',
        as: 'user',
      },
    },
    {
      $unwind: '$user',
    },
    {
      $project: {
        userId: '$user._id',
        userImage: '$user.profile_photo',
        userName: '$user.full_name',
        commentText: '$text',
        time: '$createdAt',
      },
    },
  ]);
  return postCommentData;
}
// get feed comment with feed 
const getFeedComment = async (req: any, res: Response) => {
  const session: any = await mongoose.startSession();
  session.startTransaction();
  try {
    const feedId = req.body.feedId;
    const limit = req.body.limit ? parseInt(req.body.limit) : 5; // Default limit to 5 if not provided
    const page = req.body.page ? parseInt(req.body.page) : 1; // Default page to 1 if not provided

    const pipeline: any = [
      {
        $match: { feedId: new mongoose.Types.ObjectId(feedId) },
      },
      {
        $lookup: {
          from: 'users', // Collection name for users
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $project: {
          userId: '$user._id',
          userImage: '$user.profile_photo',
          userName: '$user.full_name',
          commentText: '$text',
          time: '$createdAt',
        },
      },
      {
        $facet: {
          paginatedResults: [
            {
              $skip: (page - 1) * limit,
            },
            {
              $limit: limit,
            },
          ],
          totalCount: [
            {
              $count: 'count',
            },
          ],
        },
      },
    ];

    const result = await commentModel.aggregate(pipeline).exec();
    const commentsDetail: any = JSON.parse(JSON.stringify(result[0].paginatedResults));
    const totalCount = result[0].totalCount[0] ? result[0].totalCount[0].count : 0;
    const totalPages = Math.ceil(totalCount / limit);
    const data = {
      data: commentsDetail,
      total_items: totalCount,
      total_pages: totalPages,
    }
    if (commentsDetail) {
      await session.commitTransaction();
      await session.endSession();
      const responseData: any = {
        message: process.env.APP_GET_MESSAGE,
        data: data
      };
      return await response.sendSuccess(req, res, responseData);
    } else {
      const sendResponse: any = {
        message: "There is an issue with getting feed comments",
      };
      await session.abortTransaction();
      session.endSession();
      return response.sendError(res, sendResponse);
    }
  } catch (err: any) {
    const sendResponse: any = {
      message: err.message,
    };
    logger.info("Feed data Add");
    logger.info(err);
    await session.abortTransaction();
    session.endSession();
    return response.sendError(res, sendResponse);
  }
};
const getFeedLike = async (req: any, res: Response) => {
  const session: any = await mongoose.startSession();
  session.startTransaction();
  try {
    const feedId = req.body.feedId;
    const userId = req.user.id;
    const feed = await UserFeedModel.findById(feedId);

    if (!feed) {
      return res.status(404).json({ error: 'Feed not found' });
    }
    // Check if the user has already liked the feed
    const hasLiked = feed.likes.includes(userId);

    if (!hasLiked) {
      // If the user hasn't liked the feed, add their ID to the likes array
      feed.likes.push(userId);
    } else {
      // If the user has already liked the feed, remove their ID from the likes array
      feed.likes = feed.likes.filter(id => id.toString() !== userId);
    }

    // Save the updated feed document
    const data = await feed.save();

    if (data) {
      await session.commitTransaction();
      await session.endSession();

      // Response for liking/unliking the feed
      const message = hasLiked ? 'Feed unliked successfully' : 'Feed liked successfully';
      const responseData: any = {
        message,
        data,
      };

      return await response.sendSuccess(req, res, responseData);
    } else {
      const sendResponse: any = {
        message: 'There is an issue with updating feed likes',
      };
      await session.abortTransaction();
      session.endSession();
      return res.status(500).json(sendResponse);
    }
  } catch (err: any) {
    const sendResponse: any = {
      message: err.message,
    };
    logger.info("Feed data Add");
    logger.info(err);
    await session.abortTransaction();
    session.endSession();
    return response.sendError(res, sendResponse);
  }
};


export default {
  getFeed,
  getFeedLike,
  storeFeed,
  storeComment,
  getFeedComment,
} as const;