import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Footer = () => {
  return (
    <Card className="row-span-3 col-span-12">
      <CardContent className="">
        <p>SerialSocket</p>
        <span>star on github</span>
        <iframe
          src="https://ghbtns.com/github-btn.html?user=ahmadghoniem&repo=serialSocket&type=star&count=true&size=large"
          width="170"
          height="30"
          title="GitHub"
        ></iframe>
        <Button
          onClick={() => document.documentElement.classList.toggle("dark")}
        >
          toggle
        </Button>
      </CardContent>
    </Card>
  );
};

export { Footer };
