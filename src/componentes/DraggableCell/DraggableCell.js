import React, {
    useRef,
} from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {
    useDrag,
} from 'react-dnd'

import styles from './DraggableCell.module.css'

const propTypes = {
    children: PropTypes.element.isRequired,
    className: PropTypes.string,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
}

const defaultProps = {
    className: '',
}

const DraggableCell = ({
    children,
    className,
    type,
    id,
}) => {
    const ref = useRef(null)

    const [
        {
            isDragging,
        },
        drag,
    ] = useDrag({
        item: {
            type,
            id,
        },
        collect: (monitor) => {
            return {
                isDragging: monitor.isDragging(),
            }
        },
    })

    drag(ref)

    return (
        <div
            className={clsx(
                className,
                styles.wrapper,
                {
                    [styles.dragging]: isDragging,
                },
            )}
            ref={ref}
            draggable
        >
            {children}
        </div>
    )
}

DraggableCell.propTypes = propTypes
DraggableCell.defaultProps = defaultProps

export default DraggableCell
