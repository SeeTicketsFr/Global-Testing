import React from 'react';
import { useAtom } from 'jotai';
import { scenarioAtom } from '@/lib/atoms';
import { InputCron } from '@/components/shared-components/Cron/Input';
import _ from 'lodash';
import { Scenario } from '@/app/_type/Scenario';
import { useTranslations } from 'next-intl';
import { PlusCircle, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NoResource from '@/components/shared-components/NoResource';

interface CronProps {
    cronValue: string;
    handleCronChange: (value: string, index: number) => void;
}

function Cron({ cronValue, handleCronChange }: CronProps) {
    const cronValues = cronValue.split(' ');

    return (
        <section className='flex'>
            {cronValues.map((value: string, index: number) => (
                <InputCron
                    value={value}
                    key={index}
                    isFirst={index === 0}
                    isLast={index === cronValues.length - 1}
                    onChange={(value: string) => handleCronChange(value, index)}
                />
            ))}
        </section>
    );
}

export function Scheduler() {
    const [scenario, setScenario] = useAtom(scenarioAtom);
    const { cron } = scenario as Scenario;
    const tCron = useTranslations('step.cron')

    function handleCronChange(value: string, index: number) {
        if (!_.isNull(scenario) && !_.isUndefined(scenario.cron)) {
            const cronValues = scenario.cron?.split(' ');
            if(!_.isUndefined(cronValues)) {
                cronValues[index] = value;
                const updatedCron = cronValues.join(' ');
                const updatedScenario = { ...scenario, cron: updatedCron };
                setScenario(updatedScenario);
            }
        }
    }

    function handleAddCron() {
        if (_.isNull(scenario) || _.isUndefined(scenario.cron) || scenario.cron === '') {
            const defaultCron = '* * * * *';
            const updatedScenario = { ...scenario, cron: defaultCron };
            setScenario(updatedScenario);
        }
    }

    function handleDeleteCron() {
        if (!_.isNull(scenario) && !_.isUndefined(scenario.cron)) {
            const updatedScenario = { ...scenario, cron: '' };
            setScenario(updatedScenario);
        }
    }

    return (
        <section className="flex h-full w-full justify-center gap-4">
            {cron ? (
                <>
                    <Cron cronValue={cron} handleCronChange={handleCronChange} />
                    <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDeleteCron()}
                    className="flex-grow-1 flex-shrink-0"
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                </>
            ) : (
                <section className='flex flex-col h-full gap-2'>
                    <Button variant="default" onClick={() => handleAddCron()}>
                        <PlusCircle className="h-4 w-5" />
                        <h1>{tCron('add')}</h1>
                    </Button>
                    <NoResource text={tCron('no_cron')} />
                </section>
            )}
        </section>
    );
}
