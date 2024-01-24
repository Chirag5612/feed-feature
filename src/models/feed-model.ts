import mongoose, { model, Schema } from 'mongoose';

// user-feed schema
export interface IFeedModel {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  venueId: mongoose.Types.ObjectId;
  title: string;
  venueName:string;
  venueDate:string;
  venueLocation:string;
  description: string;
  likes: string[];
  is_active: boolean;
}

const schema = new Schema<IFeedModel>(
  {
    userId: { type: Schema.Types.ObjectId },
    venueId: { type: Schema.Types.ObjectId, ref:'venues'},
    venueName:{type:String},
    venueDate:{type:String},
    venueLocation:{type:String},
    title: { type: String },
    description: { type: String },
    likes: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    is_active: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const UserFeedModel = model('user-feeds', schema);
export default UserFeedModel;