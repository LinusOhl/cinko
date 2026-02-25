// import { Box, Divider, Title } from "@mantine/core";
// import { useParams } from "@tanstack/react-router";
// import { useAuth } from "../../auth/hooks/useAuth";
// import { useMovieReviews } from "../hooks/useMovieReviews";
// import { CreateReviewForm } from "./CreateReviewForm";
// import { MovieReview } from "./MovieReview";

// export const MovieReviews = () => {
//   const { user } = useAuth();

//   const { movieId } = useParams({ from: "/movies/$movieId/details" });

//   const { data: reviews } = useMovieReviews(movieId);

//   return (
//     <Box mt={"xl"}>
//       <Title order={2} mb={"sm"} c={"cinkoGrey.2"}>
//         Reviews
//       </Title>

//       {user && (
//         <>
//           <CreateReviewForm userId={user.id} />

//           <Divider my={"md"} />
//         </>
//       )}

//       {reviews?.map((review) => (
//         <MovieReview key={review.id} review={review} userId={user?.id} />
//       ))}
//     </Box>
//   );
// };
