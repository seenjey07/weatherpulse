import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

const Loading = () => (
  <Button className="w-full m-auto bg-transparent text-secondary text-md">
    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
    Please wait a moment...
  </Button>
);

export default Loading;
