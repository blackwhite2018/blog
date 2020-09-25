import React from 'react';
import { TagTypesProps } from '../../types';
import './index.css';

const Tag: React.FC<TagTypesProps> = ({ value }) => (
  <span className="tags__item">{value}</span>
);

export default Tag;
