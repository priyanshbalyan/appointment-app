describe('<Card /> component', () => {
  // it('renders item information correctly', () => {
  //   const onItemClickMock = jest.fn();

  //   render(<Card item={mockItem} onItemClick={onItemClickMock} />);

  //   expect(screen.getByText(mockItem.name)).toBeInTheDocument();
  //   expect(screen.getByText(`¥ 1,000`)).toBeInTheDocument();
  //   expect(
  //     screen.getByText(mockItem.like_count.toString()),
  //   ).toBeInTheDocument();
  //   expect(screen.queryByText('SOLD')).not.toBeInTheDocument();
  // });

  // it('displays SOLD when item is sold out', () => {
  //   const soldOutItem = { ...mockItem, is_sold_out: true };

  //   render(<Card item={soldOutItem} onItemClick={jest.fn()} />);

  //   expect(screen.getByText('SOLD')).toBeInTheDocument();
  // });

  // it('triggers onItemClick callback when card is clicked', () => {
  //   const onItemClickMock = jest.fn();

  //   render(<Card item={mockItem} onItemClick={onItemClickMock} />);

  //   fireEvent.click(screen.getByText('Sample Item'));
  //   expect(onItemClickMock).toHaveBeenCalledWith(mockItem.id);
  // });
});
