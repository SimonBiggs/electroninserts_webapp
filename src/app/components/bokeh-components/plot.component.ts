import { Component, Input, OnChanges, ViewChild, AfterViewInit } from '@angular/core';

import { Coordinates } from '../../services/data-services/insert-data'

declare var Bokeh: any;

@Component({
  selector: 'my-plot',
  templateUrl: './bokeh-plot.html'
})
export class PlotComponent implements OnChanges, AfterViewInit {
  @Input()
  insert_x: number[] = null
  @Input()
  insert_y: number[] = null
  @Input()
  circle: Coordinates = null;
  @Input()
  ellipse: Coordinates = null;
  @Input()
  enabled: boolean = true;
  @Input()
  plot_width: number = 300;
  @Input()
  plot_height: number = 300;

  parsedJSON: any;
  tempSource: any;
  jsonValid: boolean = true;
  jsonErrorMessage: string;

  @ViewChild('bokehplot') bokehplot: any;

  plt = Bokeh.Plotting;
  tools = 'pan,crosshair,wheel_zoom,box_zoom,reset,save';

  xrange = Bokeh.Range1d(-6, 6);
  yrange = Bokeh.Range1d(-6, 6);
  
  fig = this.plt.figure({
    title: 'Electron Insert Plot', tools: this.tools,
    x_range: this.xrange, y_range: this.yrange,
    plot_width: 300, plot_height: 300
  });

  source = new Bokeh.ColumnDataSource();
  doc = new Bokeh.Document();


  ngOnChanges() {
    this.jsonValid = false;
    this.tempSource = {
      "xs": [[0], [0], [0]],
      "ys": [[0], [0], [0]],
      "colour": ["navy", "firebrick", "green"]
    }
    let xAll: number[] = [];
    let yAll: number[] = [];
    if (this.enabled) {
      if (this.insert_x != null && this.insert_y != null) {
        this.tempSource.xs[0] = this.insert_x.concat(this.insert_x[0]);
        this.tempSource.ys[0] = this.insert_y.concat(this.insert_y[0]);
        xAll = xAll.concat(this.tempSource.xs[0]);
        yAll = yAll.concat(this.tempSource.ys[0]);
      }


      if (this.circle) {
        if ('x' in this.circle && 'y' in this.circle) {
          this.tempSource.xs[1] = this.circle.x
          this.tempSource.ys[1] = this.circle.y
          xAll = xAll.concat(this.tempSource.xs[1]);
          yAll = yAll.concat(this.tempSource.ys[1]);
        }
      }
      if (this.ellipse) {
        if ('x' in this.ellipse && 'y' in this.ellipse) {
          this.tempSource.xs[2] = this.ellipse.x
          this.tempSource.ys[2] = this.ellipse.y
          xAll = xAll.concat(this.tempSource.xs[2]);
          yAll = yAll.concat(this.tempSource.ys[2]);
        }
      }
    }

    let xMax = Math.max(...xAll);
    let xMin = Math.min(...xAll);
    let yMax = Math.max(...yAll);
    let yMin = Math.min(...yAll);

    let range = Math.max(xMax - xMin, yMax - yMin) * 1.1;
    let sqXMax = (xMax + xMin) / 2 + range / 2
    let sqXMin = (xMax + xMin) / 2 - range / 2
    let sqYMax = (yMax + yMin) / 2 + range / 2
    let sqYMin = (yMax + yMin) / 2 - range / 2



    this.fig.attributes.x_range.start = sqXMin;
    this.fig.attributes.x_range.end = sqXMax;
    this.fig.attributes.y_range.start = sqYMin;
    this.fig.attributes.y_range.end = sqYMax;
    // this.fig.update_range();
    // console.log(this.fig);

    this.source.data = this.tempSource;

    
    
  }

  ngAfterViewInit() {
    // this.ngOnChanges();
    this.fig.multi_line({ field: 'xs' }, { field: 'ys' }, {
      source: this.source,
      line_width: 2,
      color: { field: 'colour' }
    });

    this.doc.add_root(this.fig);
    Bokeh.embed.add_document_standalone(
      this.doc, this.bokehplot.nativeElement);
    

  }
}
