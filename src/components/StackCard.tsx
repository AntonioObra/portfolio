import { Stack } from "@/types/stack";

const StackCard = ({ name, tag, description, icon: Icon }: Stack) => {
    return (
        <div className="h-full flex flex-col py-6 px-8 bg-secondary rounded-xl group gap-8 hover:shadow-xl hover:shadow-primary/10 border-2 border-muted  hover:border-primary transition-all  duration-300">
            <div className=" flex items-center gap-4 ">
                <Icon className="h-10 w-10 group-hover:text-primary transition-colors duration-300" />
                <hgroup>
                    <h2 className="text-lg">{name}</h2>
                    <p className="text-sm text-muted-foreground">{tag}</p>
                </hgroup>
            </div>

            <p className="text-sm text-muted-foreground border-l-2 border-l-primary pl-8 h-full">
                {description}
            </p>
        </div>
    )
}

export default StackCard

export const StackCardShort = ({ icon: Icon, name, shortDescription }: Stack) => {
    return (
        <div className="py-6 px-8 bg-secondary flex items-center gap-4 rounded-xl group hover:shadow-xl hover:shadow-primary/10 border-2 border-muted  hover:border-primary transition-all duration-300 h-full">
            <Icon className="h-10 w-10 group-hover:text-primary transition-colors duration-300" />
            <hgroup>
                <h2 className="text-lg">{name}</h2>
                <p className="text-sm text-muted-foreground">
                    {shortDescription}
                </p>
            </hgroup>
        </div>
    )
}
