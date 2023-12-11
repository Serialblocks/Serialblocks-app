import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Github from "@/assets/icons/github.svg?react";
import X from "@/assets/icons/X.svg?react";
import Vercel from "@/assets/logos/vercel.svg?react";
const year = new Date().getFullYear();
const Footer = () => {
  return (
    <Card className="col-span-6 row-span-1">
      <CardContent className="flex flex-row items-center justify-between text-sm text-muted-foreground">
        <div>
          <p>
            <span className="font-bold"> SerialBlocks</span> © {year}. Built by{" "}
            <span>
              <a
                className="underline underline-offset-1"
                href="https://www.ahmadghoniem.me/"
              >
                Ahmad Ghoniem
              </a>
            </span>
          </p>
          <p>SerialBlocks is open source. Contribute on GitHub!</p>
          <p className="flex flex-row items-center gap-2">
            Deployed on <Vercel className="inline h-auto w-16 fill-primary" />
          </p>
        </div>

        <div className="flex flex-row">
          <nav className="flex flex-row">
            <ul className="flex flex-row gap-px">
              <li className="crumb">
                <a
                  href="https://github.com/Serialblocks-labs"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="ghost" size="sm" asChild>
                    <div>
                      <Github className="h-5 w-5 text-foreground" />
                    </div>
                  </Button>
                </a>
              </li>
              <li className="crumb">
                <a
                  href="https://twitter.com/SerialBlocks"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="ghost" size="sm" asChild>
                    <div>
                      <X className="h-5 w-5 fill-foreground" />
                    </div>
                  </Button>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </CardContent>
    </Card>
  );
};

export default Footer;
