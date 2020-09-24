import React from 'react';
import { nanoid } from 'nanoid';

import Tag from '../Tag';
import { TagsTypes } from '../../types';

const Tags: React.FC<TagsTypes> = ({ tagList }) => (
  <div className="tags">
    {tagList.map((tag: string) => (
      <Tag key={nanoid()} value={tag} />
    ))}
  </div>
);

export default Tags;
