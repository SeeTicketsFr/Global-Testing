import { Scenario as ScenarioType } from "@/app/_type/Scenario";
import Scenario from "@/app/[locale]/scenarios/_components/_components/Scenario";

interface ScenariosProps {
    scenariosData: ScenarioType[]
}

export default function Scenarios(props: ScenariosProps) {
    const { scenariosData } = props;
    
    return (
      <section className="flex flex-wrap justify-center gap-8">
          {scenariosData.map((scenario: ScenarioType) => (
              <Scenario key={scenario.id} {...scenario} />
          ))}
      </section>
    )
}