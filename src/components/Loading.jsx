import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

const Loading = () => (
  <Button disabled className="w-screen m-10">
    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
    Please wait
  </Button>
);

export default Loading;
