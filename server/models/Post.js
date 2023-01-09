import mongoose from "mongoose";

const postSchema = mongoose.Schema (
  {
    userId: {
      type: String,
      required:true
    }, 
    firstName: {
      type:String,
      required:true,
    },
    lastName: {
      type:String,
      required:true
    },
    location: {
      type: String,
    },
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      //Map much more efficient than Array
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;