export const dataRangeQueryParser = function(filter) {
 
  let qs = '';

  if(!filter) return '';

  if(filter.date) qs += `&ds=${filter.date}`;
  if(filter.date2) qs += `&dss=${filter.date2}`;
  if(filter.pickedDate) qs += `&de=${filter.pickedDate}`;
  if(filter.pickedDate2) qs += `&dee=${filter.pickedDate2}`;

  return qs;
}