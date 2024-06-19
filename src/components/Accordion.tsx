import {
    Accordion as BaseAccordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { dateRange } from "@lib/utils";
import { Badge } from "./ui/badge";

interface Props {
    data: {
        data: {
            company: string;
            role: string;
            dateStart: string;
            dateEnd: string;
            isVolunteer: boolean;
            isCourseWork: boolean;
            jobdesc: string[];
        }
    }[];
}

export function Accordion({ data }: Props) {
    return (
        <BaseAccordion type="single" collapsible className="w-full">
        {data.map((item, i) => {
            return (
            <AccordionItem value={`item-${i.toFixed()}`}>
                <AccordionTrigger>
                    <div className="flex w-full flex-col justify-between gap-2 md:flex-row items-center pr-3">
                        <div>
                            <div className="font-semibold text-black dark:text-white text-left">
                                {item.data.role} {item.data.isVolunteer && <Badge variant="outline">Volunteer</Badge>} {item.data.isCourseWork && <Badge variant="outline">Course Work</Badge>}
                            </div>
                            <div className="text-sm opacity-75 text-left">
                                {item.data.company}
                            </div>
                        </div>
                        <div className="text-sm opacity-75">
                            {dateRange(item.data.dateStart, item.data.dateEnd)}
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    {item.data.jobdesc.map((desc, i) => (
                        <div key={i} className="text-sm opacity-75">
                            • {desc}
                        </div>
                    ))}
                </AccordionContent>
            </AccordionItem>
            );
        })}
        </BaseAccordion>
    );
}