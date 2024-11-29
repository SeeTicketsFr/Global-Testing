import { Input } from "@/components/ui/input"
import { scenarioAtom } from "@/lib/atoms";
import { useAtom } from "jotai";
import _ from "lodash";
import { Settings } from "lucide-react";
import { useTranslations } from "next-intl";
export function ScenarioName() {

  const tScenario = useTranslations('scenario');
  const [scenario, setScenario] = useAtom(scenarioAtom);

  function handleNameChange(value: string) {
    setScenario({ ...scenario, name: value });
  }

    return (
        <section className="flex flex-col md:flex-row items-center gap-2">
            <Settings className="h-4 w-4 "/>
            <h1 className="text-xl font-bold">{tScenario('settings')}</h1>
            <Input className='w-fit' defaultValue={scenario?.name} onChange={(e) => handleNameChange(e.target.value)} />
        </section>
    );
};
