
export const randomText = () => {
    return (Math.random() + 1).toString(36).substring(2,6);
}

export const removeNUllValues = (obj) => {
    if (Array.isArray(obj)) { 
      return obj
          .map(v => (v && typeof v === 'object') ? removeNUllValues(v) : v)
          .filter(v => !(v == null)); 
    } else { 
      return Object.entries(obj)
          .map(([k, v]) => [k, v && typeof v === 'object' ? removeNUllValues(v) : v])
          .reduce((a, [k, v]) => (v == null ? a : (a[k]=v, a)), {});
    } 
  }

  export const removeNUllObject = (obj) => {
    return Object.entries(obj).reduce((a,[k,v]) => (v === null ? a : (a[k]=v, a)), {})
  }
