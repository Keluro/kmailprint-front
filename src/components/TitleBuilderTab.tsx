import * as React from 'react';
import { Announced } from '@fluentui/react/lib/Announced';
import { TextField, ITextFieldStyles } from '@fluentui/react/lib/TextField';
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  IColumn
} from '@fluentui/react/lib/DetailsList';
import { MarqueeSelection } from '@fluentui/react/lib/MarqueeSelection';
import { mergeStyles } from '@fluentui/react/lib/Styling';

const exampleChildClass = mergeStyles({
  display: 'block',
  marginBottom: '10px'
});

const textFieldStyles: Partial<ITextFieldStyles> = {
  root: { maxWidth: '300px' }
};

export interface IDetailsListBasicExampleItem {
  display: string;
  name: string;
}

export interface IDetailsListBasicExampleState {
  items: IDetailsListBasicExampleItem[];
  selectionDetails: string;
}

export class DetailsListBasicExample extends React.Component<
  // eslint-disable-next-line @typescript-eslint/ban-types
  {},
  IDetailsListBasicExampleState
> {
  private _selection: Selection;
  private _allItems: IDetailsListBasicExampleItem[];
  private _columns: IColumn[];

  // eslint-disable-next-line @typescript-eslint/ban-types
  constructor(props: {}) {
    super(props);

    this._selection = new Selection({
      onSelectionChanged: () =>
        this.setState({ selectionDetails: this._getFileTitle() })
    });

    // Populate with items for demos.
    this._allItems = [
      {
        name: 'subject',
        display: 'Subject'
      },
      {
        name: 'sender_email',
        display: 'Sender email'
      },
      {
        name: 'sender_name',
        display: 'Sender Name'
      }
    ];

    this._columns = [
      {
        key: 'column1',
        name: 'Name',
        fieldName: 'name',
        minWidth: 100,
        maxWidth: 200,
        isResizable: true
      }
    ];

    this.state = {
      items: this._allItems,
      selectionDetails: this._getFileTitle()
    };
  }

  public render(): JSX.Element {
    const { items, selectionDetails } = this.state;

    return (
      <div>
        <MarqueeSelection selection={this._selection}>
          <DetailsList
            items={items}
            columns={this._columns}
            isHeaderVisible={false}
            setKey="set"
            layoutMode={DetailsListLayoutMode.fixedColumns}
            selection={this._selection}
            selectionPreservedOnEmptyClick={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            checkButtonAriaLabel="select row"
            onItemInvoked={this._onItemInvoked}
          />
        </MarqueeSelection>

        <div className={exampleChildClass}>{selectionDetails}</div>
      </div>
    );
  }

  private _getFileTitle(): string {
    const selectionCount = this._selection.getSelectedCount();

    switch (selectionCount) {
      case 0:
        return 'No items selected';
      case 1:
        return (
          '1 item selected: ' +
          (this._selection.getSelection()[0] as IDetailsListBasicExampleItem)
            .name
        );
      default:
        return `${selectionCount} items selected`;
    }
  }

  private _onItemInvoked = (item: IDetailsListBasicExampleItem): void => {
    alert(`Item invoked: ${item.name}`);
  };
}
