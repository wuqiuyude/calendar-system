import React, { memo } from "react";
import { Table } from "antd";
import { DndProvider, DragSource, DropTarget } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import update from "immutability-helper";

let dragingIndex = -1;
class BodyRow extends React.Component {
  render() {
    const { isOver, connectDragSource, connectDropTarget, moveRow, ...restProps } = this.props;
    const styles = { ...restProps.style, cursor: "move" };

    let { className } = restProps;
    if (isOver) {
      if (restProps.index > dragingIndex) {
        className += " drop-over-downward";
      }
      if (restProps.index < dragingIndex) {
        className += " drop-over-upward";
      }
    }

    return connectDragSource(connectDropTarget(<tr {...restProps} className={className} style={styles} />));
  }
}

const rowSource = {
  beginDrag(props) {
    dragingIndex = props.index;
    return {
      index: props.index
    };
  }
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const monitorObj = monitor;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Time to actually perform the action
    props.moveRow(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitorObj.getItem().index = hoverIndex;
  }
};

const DragableBodyRow = DropTarget("row", rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))(
  DragSource("row", rowSource, connect => ({
    connectDragSource: connect.dragSource()
  }))(BodyRow)
);

const DropableTable = memo(props => {
  const components = {
    body: {
      row: DragableBodyRow
    }
  };

  const moveRowHandler = (dragIndex, hoverIndex) => {
    const { dataSource } = props;
    const dragRow = dataSource[dragIndex];
    props.onUpdate(
      update(props, {
        dataSource: {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragRow]
          ]
        }
      })
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Table
        {...props}
        components={components}
        onRow={(record, index) => ({
          index,
          moveRow: moveRowHandler
        })}
      />
    </DndProvider>
  );
});
export default DropableTable;
