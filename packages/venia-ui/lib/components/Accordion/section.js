import React, { useCallback } from 'react';
import { ChevronDown as ArrowDown, ChevronUp as ArrowUp } from 'react-feather';

import { useAccordionContext } from './accordion';
import Icon from '../Icon';

import { mergeClasses } from '../../classify';
import defaultClasses from './section.css';

const Section = props => {
    const { children, id, title } = props;

    const { handleSectionToggle, openSectionIds } = useAccordionContext();

    const handleSectionToggleWithId = useCallback(
        () => handleSectionToggle(id),
        [handleSectionToggle, id]
    );

    const isOpen = openSectionIds.has(id);
    const titleIconSrc = isOpen ? ArrowUp : ArrowDown;
    const titleIcon = <Icon src={titleIconSrc} />;

    const classes = mergeClasses(defaultClasses, props.classes);
    const contentsContainerClass = isOpen
        ? classes.contents_container
        : classes.contents_container_closed;

    return (
        <div className={classes.root}>
            <button
                className={classes.title_container}
                onClick={handleSectionToggleWithId}
            >
                <span className={classes.title_wrapper}>
                    <span className={classes.title}>{title}</span>
                    {titleIcon}
                </span>
            </button>
            <div className={contentsContainerClass}>{children}</div>
        </div>
    );
};

export default Section;
