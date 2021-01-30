export function PreventBubblingComponent({children}) {
  const stopBubbling = e => e.stopPropagation();

  return (
    // eslint-disable-next-line
    <div onClick={stopBubbling} onKeyDown={stopBubbling}>
      {children}
    </div>
  );
}
