import { AppDataSource } from "./data-source";
import { Board } from "./entity/Board";

const createPost = async (
  board: Board,
  postTitle: string,
  postContent: string
) => {
  try {
    console.log("Creating a new post into the database...");
    board.postTitle = postTitle;
    board.postContent = postContent;
    await AppDataSource.manager.save(board);
    console.log("Saved a new post with id: " + board.id);
  } catch (error) {
    console.log(`failed to create a post ID:${board.id} - ${error}`);
  }
};

const readPost = async () => {
  try {
    console.log("Loading post from the board...");
    const posts = await AppDataSource.manager.find(Board);
    console.log("Loaded posts: ", posts);
  } catch (error) {
    console.log(`failed to read posts - ${error}`);
  }
};

const updatePost = async () => {
  try {
    console.log("Editing post from the board...");
    
    // T O D O
  } catch (error) {
    //console.log(`failed to delete a post ID:${id} - ${error}`);
  }
};

const deletePost = async (postId) => {
  try {
    console.log("Deleting post from the board...");
    // T O D O
  } catch (error) {
    console.log(`failed to delete a post ID:${postId} - ${error}`);
  }
};
// ---------------------------------------------------


AppDataSource.initialize()
  .then(async () => {
    const myBoard = new Board();
    
    // createPost(myBoard, "Cat", "Meow meow meow")
    // createPost(myBoard, "Dog", "Bark bark bark")
    // createPost(myBoard, "Duck", "Quaek Quak Quaok")

    readPost();
  })
  .catch((error) => console.log(error));
