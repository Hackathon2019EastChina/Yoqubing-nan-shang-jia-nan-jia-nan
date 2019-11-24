import numpy as np
from sklearn.feature_extraction import DictVectorizer
from sklearn import linear_model


# 定义数据集
#
allData = np.array([[1,4,1,9,100],[5,3,0,4,90],[1,4,1,8,80],
              [1,2,2,6,70],[5,2,2,4,60],[8,2,1,6,50],
              [7,3,1,7,60],[6,4,0,6,50],[9,3,0,7,60],
              [1,4,1,9,70],[5,3,1,4,60],[1,4,1,8,50],[1,2,2,6,70]])
data_trans = []
for i in range(len(allData)):
    data_trans.append({'score':str(allData[i][2])})
vec = DictVectorizer()
dummyData = vec.fit_transform(data_trans).toarray()
allData = np.concatenate((allData[:,:-2],dummyData[:,:],allData[:,-1].reshape(len(allData),1)),axis=1)
allData = allData.astype(float)
X = allData[:,:-1]
Y = allData[:,-1] # 输入结果
# 训练数据
regr = linear_model.LinearRegression()# 使用线性回归
regr.fit(X,Y)# 拟合模型

# 用来计算准确度
def diff(result,b0,data,target):
    tar = b0
    count = 0
    print(result)
    print(data)
    print(target)
    for m in result:
        tar = tar + m * data[count]
        count = count + 1
    return target-tar

def getScore(result):
    tar = 0
    count = 0
    for m in result:
        tar = tar + m * regr.coef_[count]
        count = count + 1
    return tar

# count = 0
# for data in X:
#    print(diff(regr.coef_,regr.intercept_,data,Y[count]))
#    count = count + 1
print(diff(regr.coef_,regr.intercept_,X[0],Y[0]))
print(getScore([1,4,1,9]))