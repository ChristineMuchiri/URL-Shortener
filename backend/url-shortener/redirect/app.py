import os
import boto3
import json

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table(os.environ['TABLE_NAME'])

def lambda_handler(event, context):
    short_code = event['pathParameters'].get('short_code')
    # extract short code from URL path
    if not short_code:
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "Missing short_code"})
        }
        
    try:   
    # look up original URL in dynamodb
        response = table.get_item(Key={'short_code': short_code})
        item = response.get("Item")
    # if not found , return 404
        if not item:
            return {
                "statusCode": 404, 
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Headers": "*"
                },
                "body": json.dumps({"error": "Short URL not found"})
                }
    # redirect (http 302) to originsl URL
        return {
            "statusCode": 301,
            "headers": {
            "Location": item["original_url"],
                "Access-Control-Allow-Origin": "*"
        },
            "body": ""
    }
        
    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*"
            },
            "body": json.dumps({"error": str(e)})
        }