import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Pencil, Trash2 } from "lucide-react";
import NoQuestionsFound from "./NoQuestionsFound";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuestionListTableProps {
  questions: Question[];
  onDelete: (id: number) => void;
  onEdit: (id: number, question: Omit<Question, "id">) => void;
}

export function QuestionListTable({
  questions,
  onDelete,
  onEdit,
}: QuestionListTableProps) {
  if (questions.length <= 0) return <NoQuestionsFound />;

  return (
    <div className="relative overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-200 bg-gray-50/50">
            <TableHead className="w-12 py-4 text-center text-sm font-semibold text-gray-600">
              #
            </TableHead>
            <TableHead className="py-4 text-sm font-semibold text-gray-600">
              Question
            </TableHead>
            <TableHead className="py-4 text-sm font-semibold text-gray-600">
              Options
            </TableHead>
            <TableHead className="w-[120px] py-4 text-right text-sm font-semibold text-gray-600">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questions.map((question, index) => (
            <TableRow
              key={question.id}
              className="group border-b border-gray-100 transition-colors hover:bg-blue-50/50"
            >
              <TableCell className="text-center text-sm font-medium text-gray-500">
                {index + 1}
              </TableCell>
              <TableCell className="max-w-md py-4">
                <p className="line-clamp-2 text-sm text-gray-700">
                  {question.question}
                </p>
              </TableCell>
              <TableCell className="py-4">
                <div className="flex flex-wrap gap-2">
                  {question.options.map((option, optIndex) => (
                    <span
                      key={optIndex}
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                        option === question.correctAnswer
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-50 text-gray-600",
                      )}
                    >
                      {String.fromCharCode(65 + optIndex)}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 border-gray-200 text-gray-600 transition-colors hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => onEdit(question.id, question)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8 bg-red-50 text-red-600 transition-colors hover:bg-red-100 hover:text-red-700"
                    onClick={() => onDelete(question.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
