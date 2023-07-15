import React from 'react';

import { Order } from '../../lib/types';

interface OrderCardProps {
  order: Order;
}

export const OrderCard: React.FC<OrderCardProps> = (props) => {
  const { order } = props;

  return (
    <div>
      <div>{order.id}</div>
      <div>{order.message}</div>
    </div>
  );
};
