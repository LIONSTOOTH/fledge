import React from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: {
        labels: ['In Progress', 'Submitted', 'Phone Screen', 'Onsite Interview', 'Offer', 'Rejected'],
        datasets: [{
          // label: 'Applications',
          data: [],
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(54, 159, 64, 0.6)',
          ]
        }],

      }
    }
  }

  componentWillMount() {
    axios.get('/api/metrics')
      .then((res) => {
        // push value for each chart label to data array
        const newData = [];
        this.state.chartData.labels.forEach((label) => {
          newData.push(res.data.metrics[label]);
        });
        Promise.all(newData)
          .then(() => this.setState({ chartData: { datasets: [{ data: newData }] } }))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="chart" style={{ maxWidth: '90%' }}>
        <Bar
          data={this.state.chartData}
          // width={500}
          height={475}
          options={{
            scales: {
              xAxes: [{
                // stacked: true
              }],
              yAxes: [{
                // stacked: true,
                ticks: {
                  suggestedMin: 0,
                  stepSize: 1,
                }
              }]
            },
            maintainAspectRatio: false,
            title: {
              display: true,
              text: 'Applications By Status',
              fontSize: 25,
            },
            legend: {
              display: false,
              position: 'top',
            }
          }}
        />
      </div>
    );
  }
}

export default Chart;
