import { ISSMGetFeedbacks } from "@/api/feedback";
import { Input } from "@/components/ui/input";
import ISSMFormModal from "@/components/ui/local/formModal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "react-router-dom";
import ISSMPagination from "@/components/ui/local/pagination";

type feedback = {
  name: string;
  _id: string;
  comment: string;
  rating: number;
};

type data = {
  feedbacks: feedback[];
  limit: number;
  page: number;
  total: number;
};
export default function ISSMHome() {
  const [feedbacks, setFeedbacks] = useState<data | null>(null);
  const [name, setName] = useState("");
  const [rating, setRating] = useState("0");
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);
    setName(value);
    if (value) params.set("name", value);
    else params.delete("name");

    setSearchParams(params);
  };
  const handleRatingChange = (val: string) => {
    setRating(val);
    const params = new URLSearchParams(searchParams);
    if (val != "0") params.set("rating", val);
    else params.delete("rating");
    setSearchParams(params);
  };
  useEffect(() => {
    const ISSMFetchFeedbacks = async () => {
      const data = await ISSMGetFeedbacks({ name, rating, page: currentPage });
      setFeedbacks(data.data);
    };
    ISSMFetchFeedbacks();
  }, [currentPage, name, rating]);

  return (
    <div className=" max-w-2xl mx-auto space-y-2">
      <div className=" flex items-center justify-end gap-2">
        <Input
          placeholder="search user name"
          onChange={(e) => handleNameChange(e)}
          value={name}
        />
        <Select onValueChange={(val) => handleRatingChange(val)} value={rating}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Ratings" />
          </SelectTrigger>
          <SelectContent>
            {["1", "2", "3", "4", "5", "0"].map((item) => (
              <SelectItem value={item}>
                {item != "0" ? `Rating-${item}` : "All"}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Comment</TableHead>
            <TableHead className="text-right">Rating</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!feedbacks ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                There is no data to show
              </TableCell>
            </TableRow>
          ) : (
            feedbacks.feedbacks.map((item: feedback) => (
              <TableRow>
                <TableCell className="font-medium">{item._id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.comment}</TableCell>
                <TableCell>{item.rating}</TableCell>
                <TableCell className="text-right">
                  <ISSMFormModal isEdit={true} {...item} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <ISSMPagination
        count={feedbacks?.total || 0}
        limit={feedbacks?.limit || 0}
      />
    </div>
  );
}
