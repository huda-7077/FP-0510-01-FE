import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="py-4 text-sm font-semibold text-gray-700">
            Question
          </TableHead>
          <TableHead className="w-[120px] py-4 text-right text-sm font-semibold text-gray-700">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {questions.map((question) => (
          <TableRow
            key={question.id}
            className="transition-colors hover:bg-gray-50"
          >
            <TableCell className="line-clamp-2 max-w-[300px] truncate py-4 text-sm text-gray-700">
              {question.question}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 border-gray-200 hover:bg-gray-50 hover:text-blue-600"
                  onClick={() => onEdit(question.id, question)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="h-8 w-8 bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700"
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
  );
}
