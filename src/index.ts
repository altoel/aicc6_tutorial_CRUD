import { AppDataSource } from "./data-source";
import { Board } from "./entity/Board";
import * as fs from "fs/promises";

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
    console.log(allPosts);
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

const deletePost = async (postId: number) => {
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

const exportToJsonFile = async () => {
  const boardRepository = AppDataSource.getRepository(Board);
  try {
    const allPosts = await boardRepository.find();
    // const jsonData = allPosts.map((post) => post.toJSON());
    // const jsonString = JSON.stringify(jsonData, null, 2);
    // await fs.writeFile("board_export.json", jsonString, "utf-8");
    await fs.writeFile(
      "board_export.json",
      JSON.stringify(allPosts, null, 2),
      "utf-8"
    );
    console.log("Exported posts to board_export.json");
  } catch (error) {
    console.log(`failed to export DB - ${error}`);
  }
};

const dropTable = async () => {
  const boardRepository = AppDataSource.getRepository(Board);
  try {
    await boardRepository.clear();
    console.log("Dropped all posts");
  } catch (error) {
    console.log(`failed to drop posts - ${error}`);
  }
};

// ---------------------------------------------------

AppDataSource.initialize()
  .then(async () => {
    // 테스트용
    // 테이블 초기화 + id값 1로 초기화
    await AppDataSource.query("DELETE FROM board");
    await AppDataSource.query(
      "DELETE FROM sqlite_sequence WHERE name = 'board'"
    );

    // Create
    await createPost("Cat", "Meow Meow");
    await createPost("Dog", "Woof Woof");
    await createPost("Cow", "Moo Moo Moo");

    await readPost();

    // Update
    await updatePost(1, "Duck", "Quaek Quak Quaok");

    // Delete
    await deletePost(2); //dog 삭제

    await readPost();

    // db를 json 파일로 저장
    await exportToJsonFile();
  })
  .catch((error) => console.log(error));
