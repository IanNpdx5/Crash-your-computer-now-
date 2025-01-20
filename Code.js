const data = {
  element: {
    tagName: $0.tagName,
    id: $0.id,
    className: $0.className,
    attributes: Object.fromEntries(Array.from($0.attributes).map(attr => [attr.name, attr.value])),
    listeners: getEventListeners($0),
    computedStyle: Object.from_entries(Object.entries(window.getComputedStyle($0)).filter(([key]) => !key.startsWith('-'))),
  },
  parent: {
    tagName: $0.parentElement.tagName,
    id: $0.parentElement.id,
    className: $0.parentElement.className,
    computedStyle: Object.from_entries(Object.entries(window.getComputedStyle($0.parentElement)).filter(([key]) => !key.startsWith('-'))),
  },
  document: {
    fullscreenEnabled: document.fullscreenEnabled,
    fullscreenElement: document.fullscreenElement,
  },
};

function getEventListeners(element) {
  const listeners = [];
  const eventNames = ['click', 'dblclick', 'mousedown', 'mouseup', 'mouseover', 'mouseout', 'mousemove', 'keydown', 'keyup', 'keypress', 'focus', 'blur', 'change', 'submit', 'reset', 'select', 'scroll', 'resize', 'load', 'unload', 'abort', 'error', 'contextmenu', 'wheel'];
  for (const eventName of eventNames) {
    const eventListeners = getEventListenersForEvent(element, eventName);
    if (eventListeners) {
      listeners.push({
        eventName,
        listeners: eventListeners
      });
    }
  }
  return listeners;
}

function getEventListenersForEvent(element, eventName) {
  const listeners = [];
  const allListeners = getEventListenersForElement(element);
  for (const listener of allListeners) {
    if (listener.type === eventName) {
      listeners.push(listener);
    }
  }
  return listeners.length > 0 ? listeners : null;
}

function getEventListenersForElement(element) {
  const listeners = [];
  const eventListeners = element.eventListeners || [];
  for (const listener of eventListeners) {
    const event = listener.event;
    const type = listener.type;
    const eventName = listener.eventName;
    const callback = listener.callback;
    const capture = listener.capture;
    const options = listener.options;
    const useCapture = listener.useCapture;
    const passive = listener.passive;
    const once = listener.once;
    listeners.push({
      event,
      type,
      eventName,
      callback,
      capture,
      options,
      useCapture,
      passive,
      once
    });
  }
  return listeners;
}
