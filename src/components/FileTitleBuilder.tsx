import React, { useState } from 'react';
import {
  ComboBox,
  IComboBox,
  IComboBoxOption,
  IButtonStyles,
  IComboBoxStyles,
  PrimaryButton,
  Text
} from '@fluentui/react';
import MovingElementList from './MovingElementList';
import { LocaleContext } from '../providers/LocaleContext';
import { Separator } from '@fluentui/react/lib/Separator';
import {
  FileTitleTranslation,
  FileTitleBuilderService,
  FileTitleKind
} from '../services/FileTitleBuilderService';
import { MockOutlookService } from '../services/MockOutlookService';
import TextAsync from './TextAsync';

const FileTitleBuilder: React.FC = () => {
  const { t } = React.useContext(LocaleContext);

  const comboBoxStyles: Partial<IComboBoxStyles> = { root: { maxWidth: 300 } };
  const buttonStyles: Partial<IButtonStyles> = {
    root: { display: 'block', margin: '10px 0 20px' }
  };

  const keys = Object.keys(FileTitleTranslation);
  console.log(keys);
  const updateOptionsComboBox = () => {
    const selectedPartKeys = selectedParts.map((i) => i.key);
    return keys.map((key: string) => {
      const translationKey = FileTitleTranslation[key] as string;
      return {
        key: key,
        text: t(translationKey),
        disabled: selectedPartKeys.includes(key)
      };
    });
  };

  const outlookService = new MockOutlookService();

  const comboBoxRef = React.useRef<IComboBox>(null);
  const [selectedParts, setSelectedParts] = useState<IComboBoxOption[]>([]);

  const onClick = () => {
    const selectedPartKeys = selectedParts.map((i) => i.key);
    const toInsert = comboBoxRef.current?.selectedOptions.filter(
      (item) => !selectedPartKeys.includes(item.key)
    );
    if (toInsert && toInsert.length > 0) {
      setSelectedParts([...selectedParts, ...toInsert]);
    }
  };

  const moveUpItem = (key: number | string) => {
    const clonedArray = [...selectedParts];
    const index = clonedArray.findIndex((item) => item.key == key);
    if (index <= 0) {
      throw new Error('Not supported index limits (lowerbound)');
    } else {
      const swap = clonedArray[index];
      clonedArray[index] = selectedParts[index - 1];
      clonedArray[index - 1] = swap;
    }
    setSelectedParts(clonedArray);
  };

  const moveDownItem = (key: number | string) => {
    const clonedArray = [...selectedParts];
    const index = clonedArray.findIndex((item) => item.key == key);
    if (index >= clonedArray.length - 1) {
      throw new Error('Not supported index limits (upperbound)');
    } else {
      const swap = clonedArray[index];
      clonedArray[index] = selectedParts[index + 1];
      clonedArray[index + 1] = swap;
    }
    setSelectedParts(clonedArray);
  };

  const removeItem = (key: number | string) => {
    setSelectedParts(selectedParts.filter((item) => item.key !== key));
  };

  return (
    <>
      <ComboBox
        componentRef={comboBoxRef}
        defaultSelectedKey={keys[0]}
        options={updateOptionsComboBox()}
        styles={comboBoxStyles}
      />
      <PrimaryButton text={t('Add')} onClick={onClick} styles={buttonStyles} />

      <MovingElementList
        items={selectedParts}
        removeItem={removeItem}
        moveUpItem={moveUpItem}
        moveDownItem={moveDownItem}
      />
      <div style={{ marginTop: 20, marginBottom: 10 }}>
        <Separator>
          <Text style={{ fontWeight: 'bold' }}>{t('FileTile')}</Text>
        </Separator>
      </div>
      <TextAsync
        stringPromise={FileTitleBuilderService(
          outlookService,
          selectedParts.map((e) => e.key as FileTitleKind)
        )}
      />
    </>
  );
};

export default FileTitleBuilder;
