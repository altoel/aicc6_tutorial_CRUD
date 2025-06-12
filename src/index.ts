import { AppDataSource } from "./data-source";
import { Board } from "./entity/Board";
const readline = require("readline");

const createPost = async (postTitle: string, postContent: string) => {
  const board = new Board();
  try {
    board.postTitle = postTitle;
    board.postContent = postContent;
    await AppDataSource.manager.save(board);
    console.log(`Saved a new post: ${board.toJSON()}`);
  } catch (error) {
    console.log(`failed to create a post ID:${board.id} - ${error}`);
  }
};

const readPost = async () => {
  const boardRepository = AppDataSource.getRepository(Board);
  try {
    const allPosts = await boardRepository.find();
    console.log(`Loaded posts: ${allPosts.length}`);
  } catch (error) {
    console.log(`failed to read posts - ${error}`);
  }
};

const updatePost = async (
  postId: number,
  updatedTitle: string,
  updatedContent: string
) => {
  const boardRepository = AppDataSource.getRepository(Board);
  try {
    const postToUpdate = await boardRepository.findOneBy({
      id: postId,
    });
    if (postToUpdate) {
      postToUpdate.postTitle = updatedTitle;
      postToUpdate.postContent = updatedContent;
      await boardRepository.save(postToUpdate);
      console.log(`Updated post: ${postToUpdate.toJSON()}`);
    } else {
      console.log(`Post with ID:${postId} not found`);
    }
  } catch (error) {
    console.log(`failed to update a post ID:${postId} - ${error}`);
  }
};

const deletePost = async (
  postId: number
) => {
  const boardRepository = AppDataSource.getRepository(Board);
  try {
    const postToDelete = await boardRepository.findOneBy({
      id: postId,
    });
    if (postToDelete) {
      await boardRepository.remove(postToDelete);
      console.log(`Deleted post: ${postToDelete.toJSON()}`);
    } else {
      console.log(`Post with ID:${postId} not found`);
    }
  } catch (error) {
    console.log(`failed to delete a post ID:${postId} - ${error}`);
  }
};
// ---------------------------------------------------

AppDataSource.initialize()
  .then(async () => {
    // const rl = readline.createInterface({
    //   input: process.stdin,
    //   output: process.stdout,
    // });
    // const askQuestion = (query: string): Promise<string> => {
    //   return new Promise((resolve) => rl.question(query, resolve));
    // };

    // while (true) {
    //   console.log('1. create\n2. read\n3. update\n4. delete\n5. exit');
    //   const answer = await askQuestion('Choose an option: ');
    //   switch (answer) {
    //     case '1':
    //       const title = await askQuestion('Enter post title: ');
    //       const content = await askQuestion('Enter post content: ');
    //       await createPost(title, content);
    //       break;
    //     case '2':
    //       await readPost();
    //       break;
    //     case '3':
    //       await updatePost();
    //       break;
    //     case '4':
    //       const id = await askQuestion('Enter post ID to delete: ');
    //       await deletePost(id);
    //       break;
    //     case '5':
    //       console.log('Exiting...');
    //       rl.close();
    //       process.exit(0);
    //     default:
    //       console.log('Invalid option, please try again.');
    //   }
    // }
    // createPost("Cat", "Meow meow meow")
    // createPost("Dog", "Bark bark bark")
    await createPost("Duck", "Quaek Quak Quaok");
    await readPost();
    await updatePost(1, "Updated Duck", "Updated Quaek Quak Quaok");
    await deletePost(2);
    await readPost();
  })
  .catch((error) => console.log(error));
