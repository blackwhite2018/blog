import React from 'react';
import { TagTypesProps } from '../../types';

const Tag: React.FC<TagTypesProps> = ({ value }) => (
  <span className="tags__item">{value}</span>
);

export default Tag;
