import React, {
    useCallback,
} from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import {
    useDrop,
} from 'react-dnd'

import styles from './DroppableCell.module.css'

const propTypes = {
    children: PropTypes.element.isRequired,
    className: PropTypes.string,
    accept: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onDrop: PropTypes.func.isRequired,
}

const defaultProps = {
    className: '',
}

const DroppableCell = ({
    children,
    accept,
    className,
    id,
    onDrop,
}) => {
    const dropHandler = useCallback((item) => {
        onDrop(id, item.id)
    }, [
        id,
        onDrop,
    ])
    const canDrop = useCallback(({
        id: droppedId,
    }) => {
        return id !== droppedId
    }, [id])

    const [drop] = useDrop({
        accept,
        drop: dropHandler,
        canDrop,
    })

    return (
        <div
            ref={drop}
            className={clsx(className, styles.wrapper)}
        >
            {children}
        </div>
    )
}

DroppableCell.propTypes = propTypes
DroppableCell.defaultProps = defaultProps

export default DroppableCell
