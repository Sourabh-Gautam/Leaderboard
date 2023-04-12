const groupBy = (items, key) =>
  items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {}
  );

const dataExport = (data, filename: string) => {
  console.log('Exporting - ', data);
  const profileData: any = [];
  profileData.push(Object.keys(data[0]));
  data.forEach((e) => {
    profileData.push(Object.values(e));
  });
  const csvData = profileData.map((row) => row.join(',')).join('\n');
  const blob = new Blob([csvData], { type: 'text/csv' });

  const downloadLink = document.createElement('a');
  downloadLink.download = `${filename}.csv`;
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.click();
};

export { groupBy, dataExport };
