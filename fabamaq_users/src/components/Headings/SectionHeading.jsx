import React from 'react';
import PropTypes from 'prop-types';

const SectionHeading = ({ text, className }) => {
	return (
		<h3 className={`sideline delay-fade-down ${className}`}>
			{text}
		</h3>
	);
};

SectionHeading.propTypes = {
	text: PropTypes.string.isRequired,
	className: PropTypes.string,
};

export default SectionHeading;
