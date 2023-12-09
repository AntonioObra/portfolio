import { Icons } from "@/components/Icons";

type ExperienceCardProps = {
    title: string;
    company: string;
    date: string;
    description: string;
}

const ExperienceCard = ({ title, company, date, description }: ExperienceCardProps) => {
    return (
        <div className="h-full flex flex-col py-6 px-8 bg-secondary rounded-xl group gap-8 hover:shadow-xl hover:shadow-primary/10 border-2 border-muted  hover:border-primary transition-all  duration-300">
            <div className="flex items-center gap-8 border-b-2 border-muted pb-4">
                <Icons.code className="h-7 w-7" />
                <hgroup>
                    <h3 className="text-xl flex items-center">
                        {title}
                    </h3>
                    <p className="text-muted-foreground">
                        {company}, {date}
                    </p>
                </hgroup>
            </div>

            <p className="text-md text-muted-foreground">
                {description}
            </p>
        </div>
    )
};

export default ExperienceCard;