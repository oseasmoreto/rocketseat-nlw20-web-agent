import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateQuestionRequest } from "./types/create-question-request";
import type { CreateQuestionResponse } from "./types/create-question-response";
import type { GetRoomQuestionResponse } from "./types/get-room-questions";

export function useCreateQuestion(roomId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateQuestionRequest) => {
      const response = await fetch(
        `http://localhost:3333/rooms/${roomId}/questions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const result: CreateQuestionResponse = await response.json();

      return result;
    },

    onMutate({ questions }) {
      const questionsList = queryClient.getQueryData<GetRoomQuestionResponse>([
        "get-questions",
        roomId,
      ]);

      const questionsRegisters = questionsList ?? [];
      const newQuestion = {
        id: crypto.randomUUID(),
        questions,
        answer: null,
        createdAt: new Date().toISOString(),
        isGeneratingAnswer: true,
      };

      queryClient.setQueryData<GetRoomQuestionResponse>(
        ["get-questions", roomId],
        [newQuestion, ...questionsRegisters]
      );

      return { newQuestion, questionsList };
    },

    onSuccess: (data, _variables, context) => {
      if (context?.questionsList) {
        queryClient.setQueryData<GetRoomQuestionResponse>(
          ["get-questions", roomId],
          (questionsList) => {
            if (!questionsList) {
              return questionsList;
            }

            if (!context.newQuestion) {
              return questionsList;
            }

            return questionsList.map((question) => {
              if (question.id === context.newQuestion.id) {
                return {
                  ...context.newQuestion,
                  id: data.questionId,
                  answer: data.answer,
                  isGeneratingAnswer: false,
                };
              }

              return question;
            });
          }
        );
      }
    },

    onError: (_error, _variables, context) => {
      if (context?.questionsList) {
        queryClient.setQueryData<GetRoomQuestionResponse>(
          ["get-questions", roomId],
          context.questionsList
        );
      }
    },
  });
}
