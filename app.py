from flask import Flask, request, json,jsonify,json, render_template,redirect,url_for
from werkzeug.utils import secure_filename

import pandas as pd
import numpy as np
from datetime import datetime
import matplotlib.dates as mdates
from sklearn.metrics import mean_absolute_error, mean_squared_error,r2_score,mean_absolute_percentage_error
from prophet import Prophet
from flask_cors import CORS, cross_origin


# Create flask app
flask_app = Flask(__name__)
cors = CORS(flask_app)

final2=0
metric=[]
mae=0
mape=0
rt=0
mse=0

@flask_app.route("/")
def Home():
    return render_template("index.html")

@flask_app.route("/predict",methods=['POST','GET'])
def predict():
    if request.method == 'POST':
        global final2,metric
        metric=[]
        num_count =request.form['number']
        chr_select=request.form['perselect']
        csv_file = request.files['file']
        num_count=int(num_count)

        if(chr_select=="WEEK"):
            num_count = num_count*7
        elif(chr_select=="MONTH"):
            num_count = num_count*30
        elif(chr_select=="YEAR"):
            num_count=num_count*365

        #MACHINE LEARNING
        
        print(num_count)
        df = pd.read_csv(csv_file,error_bad_lines=False)
        dff= pd.DataFrame({'Date':[],'Sales':[]})
        dff['Date']=df['date'].values
        dff['Sales']=df['sales'].values
        

        dff= dff.groupby('Date').sum().reset_index()
        dff = dff.dropna()
        dff['Date'] = pd.to_datetime(dff['Date'])
        dff.columns = ['ds','y']

        model=Prophet(interval_width=0.95,seasonality_mode='additive')
        result=model.fit(dff)
        future = model.make_future_dataframe(periods=int(num_count),freq="D")
        forecast = model.predict(future)
        
        metric_df = forecast.set_index('ds')[['yhat']].join(dff.set_index('ds').y).reset_index()
        metric_df.dropna(inplace=True)
        rt=r2_score(metric_df.y, metric_df.yhat)
        metric.append(rt)
        mae=mean_absolute_error(metric_df.y, metric_df.yhat)
        metric.append(mae)
        mape=mean_absolute_percentage_error(metric_df.y, metric_df.yhat)
        metric.append(mape)
        mse=mean_squared_error(metric_df.y, metric_df.yhat)
        metric.append(mse)
        print(metric,rt,mae,mape,mse)
        
        forecast['date'] = pd.to_datetime(forecast['ds'])
        forecast['date'] = forecast['date'].astype(str)
        forecast = forecast.tail(num_count)
        forecast['Sales'] = dff['y']

        month=pd.DataFrame({'ds':[]})
        month['ds']=pd.concat([dff['ds'],forecast['date']])
        month['ds']=pd.to_datetime(month['ds'])
        
        
        forecast.to_csv('result.csv',mode='w',index=False)
        month.to_csv('month.csv',mode='w',index=False)

        dfs= pd.DataFrame({'Date':[],'Sales':[]})
        dfs['Date']=forecast['date'].values
        dfs['Sales']=forecast['yhat'].values
        
        final= dfs.to_json(orient="records")
        final2 = json.loads(final)
        
        return redirect("http://localhost:4200/result")

@flask_app.route("/value")
def value():
    # return "hi"
    # df=pd.DataFrame({'Sales':[],'Date':[]})
    # final2= df.to_json(orient="records")
    # result2 = json.loads(final2)
    return final2

@flask_app.route("/val")
def val():
    print(metric)
    return jsonify(metric)

if __name__ == "__main__":
    flask_app.run(debug=True)