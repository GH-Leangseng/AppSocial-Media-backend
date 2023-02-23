const Post = require('../Model/Post');
const User = require('../Model/User')
const PostController = {
        addPost: async ( req , res)=>{
               try {
                        const { username, 
                                profile_picture_path ,
                                user_id, desrciption,  
                                image_path 
                        } = req.body

                        const newPost = new Post({
                                user_id,
                                username,
                                profile_picture_path,
                                image_path,
                                desrciption
                        });
                        await newPost.save();
                        res.status(201).json({newPost,Message:"Create Success "});
               } catch (error) {
                        return res.status(400).json(error.message);
               }
        },
        likeUnLike:async (req, res)=>{
                try {
                       const {post_id , user_id} = req.body;
                       const post = await Post.findById(post_id);
                       if(post.like.includes(user_id)){
                           post.like = post.like.filter( id => {id!==user_id} );
                       }else { 
                        post.like.push(user_id);
                       }
                       await post.save();
                       res.status(201).json({post,message : "LikeUnlike Success ! "})
                } catch (error) {
                        res.status(400).json({message: error.message});
                }
        },
        getAllPost:async(req,res) => {
                try {
                        const getAllPost = await Post.find().sort('-createdAt'); ///use for use Desc 
                       const formatPost = [];
                       getAllPost.map((post)=>{
                                const formated= {
                                        _id : post.id,
                                        desrciption : post.desrciption,
                                        image_path : post.image_path,
                                        user_id : post.user_id ,
                                        profile_picture_path : post.profile_picture_path,
                                        username : post.username,
                                        like : post.like.length
                                }
                                formatPost.push(formated);
                       })
                       return res.json(formatPost);
                
                } catch (error) {
                        res.status(400).json({message: error.message});
                }
        }
}

module.exports = PostController;