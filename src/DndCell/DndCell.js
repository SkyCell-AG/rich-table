import React from 'react'
import PropTypes from 'prop-types'

import DroppableCell from '../DroppableCell'
import DraggableCell from '../DraggableCell'

const propTypes = {
    className: PropTypes.string,
    onDrop: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
}

const defaultProps = {
    className: '',
}

const DndCell = ({
    className,
    onDrop,
    type,
    id,
    children,
}) => {
    return (
        <DroppableCell
            className={className}
            onDrop={onDrop}
            accept={type}
            id={id}
        >
            <DraggableCell
                id={id}
                type={type}
            >
                {children}
            </DraggableCell>
        </DroppableCell>
    )
}

DndCell.propTypes = propTypes
DndCell.defaultProps = defaultProps

export default DndCell
