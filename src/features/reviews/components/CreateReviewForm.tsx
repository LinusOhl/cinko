// import { Button, Stack, Textarea } from "@mantine/core";
// import { useParams } from "@tanstack/react-router";
// import { useState } from "react";
// import { useReviewMovie } from "../hooks/useReviewMovie";

// interface CreateReviewFormProps {
//   userId: string;
// }

// export const CreateReviewForm = ({ userId }: CreateReviewFormProps) => {
//   const { movieId } = useParams({ from: "/movies/$movieId/details" });

//   const [reviewText, setReviewText] = useState("");
//   const reviewMovieMutation = useReviewMovie();

//   const handleReviewSubmit = () => {
//     if (!userId) {
//       throw new Error("Must be logged in!");
//     }

//     reviewMovieMutation.mutate({
//       text: reviewText,
//       movieId,
//       userId,
//     });

//     setReviewText("");
//   };

//   return (
//     <Stack gap={"sm"}>
//       <Textarea
//         value={reviewText}
//         onChange={(event) => setReviewText(event.currentTarget.value)}
//         label={"Write a review for the movie!"}
//         placeholder={
//           userId ? "Review goes here..." : "Sign in to review the movie..."
//         }
//         resize="vertical"
//         size="md"
//         minRows={4}
//         // disabled={!userId}
//         autosize
//       />

//       <Button
//         color="cinkoBlue.7"
//         style={{ alignSelf: "flex-end" }}
//         onClick={handleReviewSubmit}
//         disabled={reviewText.trim().length <= 0}
//       >
//         Submit
//       </Button>
//     </Stack>
//   );
// };
