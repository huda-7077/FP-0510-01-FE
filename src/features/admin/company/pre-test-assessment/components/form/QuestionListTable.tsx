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
  if (questions.length <= 0)
    return <p className="text-center">No Data Found</p>;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Question</TableHead>
          <TableHead className="w-[100px]">Options</TableHead>
          <TableHead className="w-[120px] text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {questions.map((question) => (
          <TableRow key={question.id}>
            <TableCell className="max-w-[300px] truncate">
              {question.question}
            </TableCell>
            <TableCell>{question.options.length}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => onEdit(question.id, question)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
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
