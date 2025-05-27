export const getColorClass = (hexColor: string): string => {
  switch (hexColor) {
    case '#f44336': return 'red';
    case '#e91e63': return 'pink';
    case '#9c27b0': return 'purple';
    case '#673ab7': return 'indigo';
    case '#3f51b5': return 'blue';
    case '#2196f3': return 'sky';
    case '#03a9f4': return 'cyan';
    case '#00bcd4': return 'teal';
    case '#009688': return 'green';
    case '#4caf50': return 'lime';
    case '#8bc34a': return 'yellow';
    case '#cddc39': return 'amber';
    case '#ffeb3b': return 'orange';
    case '#ffc107': return 'orange'; 
    case '#795548': return 'brown';
    case '#9e9e9e': return 'gray';
    case '#607d8b': return 'blue-gray';
    default: return 'gray';
  }
};