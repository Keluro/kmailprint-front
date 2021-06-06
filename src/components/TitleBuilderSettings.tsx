import React, { useState } from 'react';
import {
  ComboBox,
  IComboBox,
  IButtonStyles,
  IComboBoxStyles,
  PrimaryButton,
  Text
} from '@fluentui/react';
import MovingElementList, { IItemKey } from './MovingElementList';
import { LocaleContext } from '../providers/LocaleContext';
import { Separator } from '@fluentui/react/lib/Separator';
import {
  FileTitleTranslation,
  FileTitleBuilderService,
  FileTitleKind
} from '../services/FileTitleBuilderService';
import TextAsync from './TextAsync';
import { SettingsResolverService } from '../services/SettingsResolverService';
import { IServiceProps } from './IServiceProps';

const TitleBuilderSettings: React.FC<IServiceProps> = (
  props: IServiceProps
) => {
  const comboBoxStyles: Partial<IComboBoxStyles> = { root: { maxWidth: 300 } };
  const buttonStyles: Partial<IButtonStyles> = {
    root: { display: 'block', margin: '10px 0 20px' }
  };
  const settingsResolver = new SettingsResolverService(
    props.services.outlookService
  );

  type IOptionItemKey = IItemKey & { disabled: boolean };

  const allKeys = Object.keys(FileTitleTranslation);

  const updateOptionsComboBox = () => {
    const selectedPartKeys = selectedParts.map((i) => i.key);
    return allKeys.map((key: string) => {
      const translationKey = FileTitleTranslation[key] as string;
      return {
        key: key,
        text: t(translationKey),
        disabled: selectedPartKeys.includes(key)
      } as IOptionItemKey;
    });
  };

  const setAndSaveSelectedParts = (partsToSave: IItemKey[]) => {
    settingsResolver.savePatternArray(
      partsToSave.map((s) => s.key as FileTitleKind)
    );
    setSelectedParts(partsToSave);
  };

  const getDefaultSavedPattern = () => {
    const savedPatternKeys = settingsResolver.getSettings().fileTitlePattern;
    return savedPatternKeys.map((key) => {
      const translationKey = FileTitleTranslation[key] as string;
      return { key: key, text: t(translationKey) } as IItemKey;
    });
  };

  const onClick = () => {
    const selectedPartKeys = selectedParts.map((i) => i.key);
    const toInsert = (comboBoxRef.current
      ?.selectedOptions as IItemKey[]).filter(
      (item) => !selectedPartKeys.includes(item.key)
    );
    if (toInsert && toInsert.length > 0) {
      setAndSaveSelectedParts([...selectedParts, ...toInsert]);
    }
  };

  const move = (
    key: string,
    condition: (index: number) => boolean,
    swapIndex: number
  ) => {
    const clonedArray = [...selectedParts];
    const index = clonedArray.findIndex((item) => item.key == key);
    if (condition(index)) {
      throw new Error('Not supported index limits');
    } else {
      const swap = clonedArray[index];
      clonedArray[index] = selectedParts[index - swapIndex];
      clonedArray[index - swapIndex] = swap;
    }
    setAndSaveSelectedParts(clonedArray);
  };

  const moveUpItem = (key: string) => {
    move(key, (index) => index <= 0, 1);
  };

  const moveDownItem = (key: string) => {
    move(key, (index) => index >= selectedParts.length - 1, -1);
  };

  const removeItem = (key: string) => {
    setAndSaveSelectedParts(selectedParts.filter((item) => item.key !== key));
  };

  const { t } = React.useContext(LocaleContext);
  const comboBoxRef = React.useRef<IComboBox>(null);
  const [selectedParts, setSelectedParts] = useState<IItemKey[]>(
    getDefaultSavedPattern()
  );

  return (
    <>
      <ComboBox
        label={t('ComposeTitle')}
        componentRef={comboBoxRef}
        defaultSelectedKey={allKeys[0]}
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
          <Text style={{ fontWeight: 'bold' }}>{t('FileTitle')}</Text>
        </Separator>
      </div>
      <TextAsync
        stringPromise={FileTitleBuilderService(
          props.services.outlookService,
          props.services.mailprinterService,
          selectedParts.map((e) => e.key as FileTitleKind)
        )}
      />
    </>
  );
};

export default TitleBuilderSettings;
