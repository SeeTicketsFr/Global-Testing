import { useEffect, useState } from 'react';
import { useStep } from '@/app/_hooks/useStep';
import { HttpStepAppTyped, SqsStepAppTyped, StepsAppTyped } from '@/app/_type/Step';
import { useTranslations } from 'next-intl';
import AutocompleteTextArea from '@/components/shared-components/Autocomplete/AutocompleteTextArea';

interface ContentsProps {
  obj: HttpStepAppTyped | SqsStepAppTyped;
  setObj: any;
}

export function Contents({ obj, setObj }: ContentsProps) {
  const { content } = obj;
  const [jsonView, setJsonView] = useState(JSON.stringify(content, null, 2));
  const [isValid, setIsValid] = useState<boolean>(true);
  const tContent = useTranslations('step.content');

  useEffect(() => {
    setJsonView(JSON.stringify(content, null, 2));
  }, [content]);

  const handleJsonChange = (jsonString: string) => {
    setJsonView(jsonString);
    try {
      const parsedContent = JSON.parse(jsonString);
      const newStep = { ...obj, content: parsedContent } as StepsAppTyped;
      setObj(newStep);
      setIsValid(true);
    } catch (error) {
      setIsValid(false);
    }
  };  

  return (
    <div className="w-full h-fit max-h-full flex flex-col space-y-2">
      <AutocompleteTextArea
        className="h-40"
        value={jsonView}
        onChange={(e: string) => { handleJsonChange(e) }}
        placeholder={tContent('write_json')}
      />
      {isValid ? (
        <h1 className="text-sm text-green-500">{tContent('valid')}</h1>
       ) : (
        <h1 className="text-sm text-red-500">{tContent('invalid')}</h1>

      )}
    </div>
  );
}
