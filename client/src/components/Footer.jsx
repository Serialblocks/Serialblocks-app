import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sun, Moon, Github, Twitter } from "lucide-react";
const year = new Date().getFullYear();
const Footer = () => {
  return (
    <Card className="col-span-6 row-span-1 row-start-[12]">
      <CardContent className="flex flex-row text-sm text-muted-foreground">
        <div>
          <p>
            <span className="font-bold"> SerialSocket</span> © {year}. Built by
            Ahmad Ghoniem.
          </p>
          <p>This project is open source. Contribute on GitHub!</p>
        </div>

        <div className="flex flex-row">
          <Button
            onClick={() => document.documentElement.classList.toggle("dark")}
            variant="ghost"
          >
            <Moon />
          </Button>
          <Separator className="space-x-10" orientation="vertical" />
          <nav className="flex flex-row">
            <ul className="flex flex-row">
              <li className="crumb">
                <a href="#">
                  <Github />
                </a>
              </li>
              <li className="crumb">
                <a href="#">
                  <Twitter />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </CardContent>
    </Card>
  );
};

export { Footer };
