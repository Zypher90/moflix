// import {APPWRITE_DB_ID, VITE_APPWRITE_PROJECT_ID, APPWRITE_TABLE_ID} from "../dotenv.js"
// import {Client, Databases, ID, Query, TablesDB} from "appwrite";
//
// const client = new Client()
//     .setEndpoint("https://fra.cloud.appwrite.io/v1")
//     .setProject(VITE_APPWRITE_PROJECT_ID)
//
// const tablesDB = new TablesDB(client)
//
// export const updateSearchCount = async (searchTerm, movie) => {
//     try{
//         const result = await tablesDB.listRows(APPWRITE_DB_ID, APPWRITE_TABLE_ID, [
//             Query.equal('searchTerm', searchTerm)
//         ]);
//         if(result.total>0){
//             const doc = result.rows[0];
//             await tablesDB.updateRow(APPWRITE_TABLE_ID, APPWRITE_TABLE_ID, doc.$id, {
//                 count: doc.count + 1,
//             });
//         }else{
//             await tablesDB.createRow(APPWRITE_TABLE_ID, APPWRITE_TABLE_ID, ID.unique(), {
//                 searchTerm: searchTerm,
//                 count: 1,
//                 movie_id: movie.id,
//                 poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
//             });
//         }
//     }catch(error){
//         console.log(error)
//     }
// }