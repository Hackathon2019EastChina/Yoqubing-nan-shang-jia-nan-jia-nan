import numpy as np
from sklearn.feature_extraction import DictVectorizer
from sklearn import linear_model


# 定义数据集
allData = np.array([[1,4,1,9,100],[5,3,0,4,90],[1,4,1,8,80],
              [1,2,2,6,70],[5,2,2,4,60],[8,2,1,6,50],
              [7,3,1,7,60],[6,4,0,6,50],[9,3,0,7,60],
              [1,4,1,9,70],[5,3,1,4,60],[1,4,1,8,50],[1,2,2,6,70]])
X = allData[:,:-1]
Y = allData[:,-1]

# 训练数据
regr = linear_model.LinearRegression()
regr.fit(X,Y)
print('coefficients(b1,b2...):',regr.coef_)
print('intercept(b0):',regr.intercept_)


def result(data):
    return regr.predict(np.array(data))

print(result([[1,4,1,9]]))